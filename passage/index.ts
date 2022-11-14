import { Passage } from '@passageidentity/passage-js';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

const passage = new Passage(process.env.NEXT_PUBLIC_PASSAGE_ID!);
const identifier = 'francisco.m.gomes.oliveira@gmail.com';

export const login = async (router: NextRouter, setLoggedIn: Dispatch<SetStateAction<boolean>>, setLoading: Dispatch<SetStateAction<string>>, sendMail?: boolean) => {
  setLoading('Waiting for login...');
  if (await passage.isWebauthnSupported(false)) {
    return await passage.login(identifier).then(v => {
      if (v.redirect_url) {
        router.push(v.redirect_url);
        setLoggedIn(true);
      }
      setLoading('');
      return v.auth_token;
    }).catch(async (e) => {
      console.log(e);
      if (sendMail) return await passage.newLoginMagicLink(identifier).then((lk) => {
        setLoading('Check you email for the magic link');
        const { id } = lk;
        setInterval(async () => {
          const status = await passage.getMagicLinkStatus(id).then((s) => {
            setLoggedIn(true);
            setLoading('');
            router.push(s.redirect_url);
            return s.auth_token;
          }).catch(e => { });
        }, 1000);
      }).catch(e => { return null; });
      else {
        setLoading('');
        return null;
      };
    });
  } else {
    return await passage.newLoginMagicLink(identifier).then((lk) => {
      const { id } = lk;
      setInterval(async () => {
        const status = await passage.getMagicLinkStatus(id).then((s) => {
          setLoggedIn(true);
          setLoading('');
          router.push(s.redirect_url);
          return s.auth_token;
        }).catch(e => { });
      }, 1000);
    }).catch(e => { setLoading(''); return null; });
  }
};

export const activateLink = async (id: string) => {
  return await passage.magicLinkActivateWebAuthnNewDevice(id).then(v => {
    return v.auth_token;
  }).catch(async (e) => {
    console.log(e);
    return await passage.magicLinkActivate(id).then(v => {
      return v.auth_token;
    }).catch(e => {
      console.log(e);
      return null;
    });
  });
};

export const register = async (router: NextRouter, setLoggedIn: Dispatch<SetStateAction<boolean>>) => {
  return await passage.register(identifier).then(v => {
    if (v.redirect_url) {
      router.push(v.redirect_url);
      setLoggedIn(true);
    }
    return v.auth_token;
  }).catch(e => {
    console.log(e);
    return null;
  });
};

export const logout = async (router: NextRouter, setLoggedIn: Dispatch<SetStateAction<boolean>>) => {
  const user = passage.getCurrentUser();
  if (user) user.signOut();
  setLoggedIn(false);
  router.push('/login');
};

export const getUser = () => passage.getCurrentUser();

export default passage;