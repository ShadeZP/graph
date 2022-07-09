export function createAuthHeader(jwt: string) {
  return { headers: { Authorization: jwt } }
}