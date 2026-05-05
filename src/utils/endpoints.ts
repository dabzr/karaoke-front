export const managerEndpoint = "/manager";
export const roomEndpoint = "/room";
<<<<<<< Updated upstream
export const joinRoomEndpoint = (code: string) => `/room/${code}/join`;
=======
export const joinRoomEndpoint = (code: string) => `${roomEndpoint}/${code}/join`;
export const loginEndpoint = `${managerEndpoint}/login`;
export const roomAuthEndpoint = (code: string, id: string) => `${roomEndpoint}/${code}/${id}/auth`;
export const roomInfoEndpoint = (code: string) => `${roomEndpoint}/${code}/info`;
export const roomQueueEndpoint = (code: string) => `${roomEndpoint}/${code}/queue`;
export const roomTopicQueueEndpoint = (code: string) => "/topic" + `${roomEndpoint}/${code}/queue`;
>>>>>>> Stashed changes
