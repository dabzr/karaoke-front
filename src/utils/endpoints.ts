export const managerEndpoint = "/manager";
export const roomEndpoint = "/room";
export const joinRoomEndpoint = (code: string) => `${roomEndpoint}/${code}/join`;
export const loginEndpoint = `${managerEndpoint}/login`;
export const roomInfoEndpoint = (code: string) => `${roomEndpoint}/${code}/info`;
export const roomQueueEndpoint = (code: string) => `${roomEndpoint}/${code}/queue`;
export const roomTopicQueueEndpoint = (code: string) => `/topic/queue${roomEndpoint}/${code}`;
export const queueRoomQueueEndpoint = (code: string) => `/queue${roomEndpoint}/${code}/queue`;
export const queueRoomEndpoint = (code: string) => `/queue${roomEndpoint}/${code}`;
export const roomManagerEndpoint = `${roomEndpoint}${managerEndpoint}`;
export const roomUsersEndpoint = (code: string) => `${roomEndpoint}/${code}/user/all`;
export const queueRoomPassEndpoint = (code: string) => `/queue${roomEndpoint}/${code}/pass`;
export const queueRoomSongEndpoint = (code: string, id: string) => `/queue${roomEndpoint}/${code}/${id}`;
export const usersTopicQueueEndpoint = (code: string) => `/topic/users${roomEndpoint}/${code}`;
export const roomTopicQueueUrlEndpoint = (code: string) => `/topic/queue${roomEndpoint}/${code}/url`;
export const managerUpgradePlanEndpoint = (type: string) => `${managerEndpoint}/upgrade/{id}/${type}`;
export const roomCodeEndpoint = (code: string) => `${roomEndpoint}/${code}`;
export const roomQrScreenEndpoint = (code: string) => `${roomEndpoint}/${code}/qrscreen`;
export const usersTopicQueueQrEndpoint = (code: string) => `${usersTopicQueueEndpoint(code)}/qr`
export const historyEndpoint = (code: string, start: number, end: number) => `/queue${roomEndpoint}/${code}/history/${start}/${end}`
export const roomIdEndpoint = (code: string) => `${roomEndpoint}/${code}`
