export interface CreateRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateRequestDTO {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface RemoveRequestDTO {
  id: string;
}

export interface CreateResponseDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface UpdateResponseDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface RemoveResponseDTO {
  id: string;
}
