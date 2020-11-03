/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { AuthenticationResult, AuthError } from "@azure/msal-browser";
import { useState, useEffect } from "react";

import { useMsal } from "./useMsal";

export function useHandleRedirect(): [AuthenticationResult|null, AuthError|null] {
    const { instance } = useMsal();
    const [response, setResponse] = useState<AuthenticationResult|null>(null);
    const [error, setError] = useState<AuthError|null>(null);

    useEffect(() => {
        instance.handleRedirectPromise().then((response: AuthenticationResult|null) => {
            if (response) {
                setResponse(response);
                setError(null);
            }
        }).catch((e: AuthError) => {
            setError(e);
            setResponse(null);
        });
    }, [instance]);

    return [response, error];
}