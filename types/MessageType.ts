export interface MessageType {
  stream_id: string;
  type: null;
  content: MessageContent;
  context: string;
  creator: string;
  creator_details: CreatorDetails;
  context_details: MessageContextDetails;
  master: null;
  reply_to: null;
  reply_to_details: null;
  reply_to_creator_details: null;
  count_likes: number;
  count_haha: number;
  count_downvotes: number;
  count_replies: number;
  timestamp: number;
  count_commits: number;
  indexing_metadata: IndexingMetadata;
  last_reply_timestamp: null;
}

export interface MessageContent {
  body: string;
  master: null;
  context: string;
  mentions: any[];
  reply_to: null;
}

export interface MessageContextDetails {
  context_id: string;
  context_details: ContextDetailsContextDetails;
}

export interface ContextDetailsContextDetails {
  name: string;
  context: null;
  project_id: string;
  websiteUrl: string;
  accessRules: AccessRule[];
  displayName: string;
  integrations: Integrations;
}

export interface AccessRule {
  type?: string;
  requiredCredentials?: RequiredCredential[];
  operator?: string;
}

export interface RequiredCredential {
  id: number;
  family: string;
  issuer: string;
  weight: number;
  content: RequiredCredentialContent;
  created_at: Date;
  identifier: string;
}

export interface RequiredCredentialContent {
  issuer: Issuer;
  "@context": string[];
  issuanceDate: string;
  credentialSubject: CredentialSubject;
}

export interface CredentialSubject {
  id: string;
  name: string;
  type: string;
  network: string;
  protocol: string;
  description: string;
}

export interface Issuer {
  id: string;
  name: string;
}

export interface Integrations {}

export interface CreatorDetails {
  a_r: number;
  did: string;
  nonces: Nonces;
  profile: Profile;
  metadata: Metadata;
  github_details: null;
  verified_email: boolean;
  count_followers: number;
  count_following: number;
  encrypted_email: EncryptedEmail;
  twitter_details: null;
}

export interface EncryptedEmail {
  encryptedString: string;
  encryptedSymmetricKey: string;
  accessControlConditions: string;
}

export interface Metadata {
  chain: string;
  address: string;
  ensName: string;
}

export interface Nonces {
  global: number;
  mainnet: number;
  polygon: number;
  arbitrum: number;
}

export interface Profile {
  pfp: string;
  pfpIsNft: PfpIsNft;
  username: string;
  description: string;
}

export interface PfpIsNft {
  chain: string;
  tokenId: string;
  contract: string;
  timestamp: string;
}

export interface IndexingMetadata {
  language: string;
}
