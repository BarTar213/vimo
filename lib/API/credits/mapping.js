import { imageAddress } from '@/lib/API/helpers/image-base-address'

export const mapCastFromBackend = (entity) => {
  entity.profile_path = `${imageAddress}${entity.profile_path}`
}

export const mapEntityFromBackend = (entity) => {
  entity.cast.map((cast) => {
    return mapCastFromBackend(cast)
  })
  return entity
}
