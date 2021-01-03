export const mapListFromBackend = (input) => {
  input.map((entity) => {
    return mapNotificationFromBackend(entity)
  })
}

export const mapNotificationFromBackend = (entity) => {
  entity.to = `/${entity.tag}#${entity.resource}${entity.resource_id}`
}
