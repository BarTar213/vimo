import { dateMapping } from '@/lib/API/common/mapping'

export const mapEntityFromBackend = (entity) => {
  entity.budget = prettyNumber(entity.budget)
  entity.release_date = dateMapping(entity.release_date)
  entity.revenue = prettyNumber(entity.revenue)
  entity.production_countries = arrayMapping(entity.production_countries, 'name')
  entity.production_companies = arrayMapping(entity.production_companies, 'name')
  entity.spoken_languages = arrayMapping(entity.spoken_languages, 'name')
  entity.genres = arrayMapping(entity.genres, 'name')
  return entity
}

function prettyNumber (x) {
  return '$' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function arrayMapping (array, field) {
  const results = []
  for (const val of array) {
    results.push(val[field])
  }

  return results
}
