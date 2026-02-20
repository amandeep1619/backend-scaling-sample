export interface ICreateNoteBook {
  name: string
  userId: string
}

export interface IUpdateNoteBook {
  name: string
}

export interface IShareNoteBook {
  id: string
  userId : string[]
}