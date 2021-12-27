// interface RoleType {
//   role: any;
// }

// export type userRole = RoleType{
//                         role:['ADMINISTRATOR','STANDARD']
//                       };

export interface RoleType {
  role: any
}

export type userRole = [RoleType]
export type Role = 'ADMINISTRATOR' | 'STANDARD';
export type Language = 'en-US' | 'sl-SI';


export const usrRole = ['ADMINISTRATOR','USER','ADMIN'];
