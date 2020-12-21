import { dateMapping } from '@/lib/API/common/mapping'

export const mapEntityFromBackend = (entity) => {
  entity.update_date = dateMapping(entity.update_date)
  entity.create_date = dateMapping(entity.create_date)
  return entity
}

export const mapListFromBackend = (input) => {
  input.map((entity) => {
    return mapEntityFromBackend(entity)
  })
}
