export const loadAssets = () => {
    const loadEnvBoolean = Boolean(Number(loadData("load Assets",process.env.LOAD_ENV)))
    return loadEnvBoolean
}

export const loadData = (envName, env) => {
    const isEnvHasValue = env ? env : console.log(`🔴 ${envName} env variable is not found..`)
    return isEnvHasValue
}
