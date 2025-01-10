import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useIsTestUser = () => {
    const [isTestUser, setIsTestUser] = useState(false);

    const { profile, } = useSelector(({ EvoloAi }: any) => EvoloAi.profile);

    useEffect(() => {
        if (profile?.email) {

            const testUserRegex = /^([a-zA-Z0-9_\-\.]+)@(adultedpro.com|yopmail.com)$/;

            if (testUserRegex.test(profile?.email)) {
                setIsTestUser(true);
            } else {
                setIsTestUser(false);
            }
        } else {
            setIsTestUser(false);
        }
    }, [profile?.email]);

    return isTestUser;
};