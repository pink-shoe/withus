// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/Page404`
  | `/about`
  | `/google`
  | `/kakao`
  | `/login`
  | `/mypage`
  | `/mypage/photoalbum`
  | `/posts`
  | `/posts/:id`
  | `/posts/:id/:pid?`
  | `/posts/:id/deep`
  | `/register`
  | `/splat/${string}`

export type Params = {
  '/posts/:id': { id: string }
  '/posts/:id/:pid?': { id: string; pid?: string }
  '/posts/:id/deep': { id: string }
}

export type ModalPath = `/modal`

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
