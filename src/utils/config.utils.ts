export const validateEnv = <T extends Record<string, string>>(requiredEnvs: (keyof T)[]): void => {
  const missingEnvs = requiredEnvs.filter((env) => !process.env[env as string])

  if (missingEnvs.length) {
    throw new Error(`Missing required environment variables: ${missingEnvs.join(', ')}`)
  }
}
