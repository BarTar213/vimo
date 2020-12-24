import { dateMapping } from '@/lib/API/common/mapping'
import { imageAddress } from '@/lib/API/helpers/image-base-address'

export const mapEntityFromBackend = (entity) => {
  entity.budget = prettyNumber(entity.budget)
  entity.release_date = dateMapping(entity.release_date)
  entity.revenue = prettyNumber(entity.revenue)
  entity.production_countries = arrayMapping(entity.production_countries, 'name')
  entity.production_companies = arrayMapping(entity.production_companies, 'name')
  entity.spoken_languages = arrayMapping(entity.spoken_languages, 'name')
  entity.genres = arrayMapping(entity.genres, 'name')
  entity.runtime = timeMapping(entity.runtime)
  entity.backdrop_path = `${imageAddress.backdrop}${entity.backdrop_path}`
  return entity
}

export const mapMoviePreviewFromBackend = (entity) => {
  entity.release_date = dateMapping(entity.release_date)
  entity.poster_path = `${imageAddress.searchPoster}${entity.poster_path}`
  return entity
}

export const mapListFromBackend = (input) => {
  input.map((entity) => {
    return mapMoviePreviewFromBackend(entity)
  })
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

function timeMapping (time) {
  const hours = Math.floor(time / 60)
  const minutes = time % 60
  let result = ''
  if (hours > 0) {
    result += hours + 'h '
  }
  return result + minutes + 'm'
}
