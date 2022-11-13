import { Passage } from '@passageidentity/passage-js';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

const passage = new Passage(process.env.NEXT_PUBLIC_PASSAGE_ID!);
const identifier = 'francisco.m.gomes.oliveira+wallt@gmail.com';

export const login = async (router: NextRouter, setLoggedIn: Dispatch<SetStateAction<boolean>>) => {
  return await passage.login(identifier).then(v => {
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