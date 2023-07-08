import { ORBIS, ORBIS_PROJECT_ID } from "@/config"
import useRooms from "./store/useRooms"

type MinimalCredential = {
    identifier: string;
};

type CredentialRule = {
    type: "credential";
    requiredCredentials: Array<MinimalCredential>;
};

const hasCredential = (
    targetCredential: MinimalCredential,
    userCredentials: Array<MinimalCredential>
) => {
    return userCredentials.some(
        (credential) => credential.identifier === targetCredential.identifier
    );
};

const checkCredentialRule = (rule: CredentialRule, userCredentials: Array<MinimalCredential>) => {
    for (const credential of rule.requiredCredentials) {
        if (hasCredential(credential, userCredentials)) return true;
    }

    return false;
};

const hasContextAccess = (context: any, userCredentials: Array<MinimalCredential>) => {
    if (!context.content.accessRules || context.content.accessRules.length === 0) {
        return true;
    }

    for (const rule of context.content.accessRules) {
        // Check Credential rules only, for now
        if (rule.type !== "credential") continue;
        if (checkCredentialRule(rule, userCredentials)) return true;
    }

    return false;
};

const getCurrentSession = async () => {
    try {
        const res = await ORBIS.isConnected()

        if (res.did) return res.did

        return
    } catch {
        return
    }
}

const updateRoomAccess = async (setRooms: any, _did?: string) => {
    const did = _did || await getCurrentSession()
    if (!did) return

    const { data: userCredentials } = await ORBIS.getCredentials(did);
    const { data: contexts } = await ORBIS.getContexts(ORBIS_PROJECT_ID);
    const userContexts: any = [];
    for (const context of contexts) {
      if (!hasContextAccess(context, userCredentials)) continue;
      userContexts.push(context);
    }

    setRooms(userContexts);
}

export default () => ({ updateRoomAccess })