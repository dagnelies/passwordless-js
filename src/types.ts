// 'extern' is deprecated in favor of 'roaming' but kept for compatibility purposes
export type AuthType = 'auto' | 'local' | 'extern' | 'roaming' | 'both'


// TODO: although algo "-8" is currently only used optionally by a few security keys, 
// it would not harm to support it for the sake of completeness
export type NumAlgo = -7 | -257
export type NamedAlgo = 'RS256' | 'ES256'


export interface CommonOptions {
  challenge :string
  domain ?:string // used for parent/subdomain auth and other exotic use cases
  userVerification ?:UserVerificationRequirement
  authenticatorType ?:AuthType
  timeout ?:number
  debug ?:boolean
}


export interface AuthenticateOptions extends CommonOptions {
  allowCredentials ?:string[]
  mediation ?:CredentialMediationRequirement // TODO: explain in docs
  signal ?:AbortSignal
}

export interface AuthenticationEncoded {
    credentialId: string
    //userHash: string, // unreliable, optional for authenticators
    authenticatorData: string
    clientData: string
    signature: string
    userId?: string
}

export interface AuthenticationParsed {
  credentialId: string
  //userHash: string, // unreliable, optional for authenticators
  authenticator: AuthenticatorInfo
  client: ClientInfo,
  signature: string
}


export interface RegisterOptions extends CommonOptions {
  user: string | User
  attestation?: boolean
  discoverable?: ResidentKeyRequirement
}

export interface User { 
  id? :string
  name :string
  displayName? :string
}

export interface CredentialKey {
  id: string
  publicKey: string
  algorithm: NamedAlgo
  synced?: boolean // only available after parsing
}


export interface RegistrationEncoded {
    user: User
    credential: CredentialKey
    authenticatorData: string
    clientData: string
    attestationData?: string
}

export interface RegistrationParsed {
  user: User
  credential: CredentialKey
  authenticator: AuthenticatorInfo
  client: ClientInfo
  attestation?: any
}

export interface ClientInfo {
  type: "webauthn.create" | "webauthn.get"
  challenge: string
  origin: string
  crossOrigin: boolean
  tokenBindingId?: {
    id: string
    status: string
  }
  extensions?: any
}

export interface AuthenticatorInfo {
    rpIdHash: string,
    flags: {
      userPresent: boolean
      userVerified: boolean
      backupEligibility: boolean
      backupState: boolean
      attestedData: boolean
      extensionsIncluded: boolean
    }
    counter: number
    aaguid: string
    name: string

    icon_light: string
    icon_dark: string
  }