import * as Yup from 'yup'

export const PROVIDER_ENUM = ['PHONENUMBER', 'EMAIL', 'FACEBOOK', 'GOOGLE']

export const userInfoSchema = Yup.object().shape({
    token: Yup.string().required(),
    provider: Yup.string()
        .oneOf(PROVIDER_ENUM)
        .required()
})

export const providerFacebookSchema = Yup.object().shape({
    token: Yup.string().required(),
    provider: Yup.string()
        .oneOf(PROVIDER_ENUM)
        .required()
})

export const providerGoogleSchema = Yup.object().shape({
    token: Yup.string().required(),
    provider: Yup.string()
        .oneOf(PROVIDER_ENUM)
        .required()
})

export const providerPhoneNumberSchema = Yup.object().shape({
    phonenumber: Yup.string().required(),
    provider: Yup.string()
        .oneOf(PROVIDER_ENUM)
        .required()
})

export const providerEmailSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
    provider: Yup.string()
        .oneOf(PROVIDER_ENUM)
        .required()
})
