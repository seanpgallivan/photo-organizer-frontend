// Basic Definitions:
// const API_URL = "https://stormy-everglades-64629.herokuapp.com:4000/"
const API_URL = "http://localhost:4000/"

const headers = () => ({
  "Content-Type": "application/json",
  "Accept": "application/json"
})




// Fetches:
const getUser = username =>
  fetch(API_URL+`users/${username}`)
    .then(r => r.json()).then(handleErrors)

const postUser = user => 
  fetch(API_URL+"users", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(user)
  }).then(r => r.json()).then(handleErrors)

const postAlbum = album => 
  fetch(API_URL+"albums", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(album)
  }).then(r => r.json()).then(handleErrors)

const patchAlbum = album => 
  fetch(API_URL+`albums/${album.id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(album)
  }).then(r => r.json()).then(handleErrors)

const deleteAlbum = id => 
  fetch(API_URL+`albums/${id}`, {
    method: "DELETE",
    headers: headers()
  }).then(r => r.json()).then(handleErrors)

const postPhoto = photo =>
  fetch(API_URL+"photos", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(photo)
  }).then(r => r.json()).then(handleErrors)

const patchPhoto = photo =>
  fetch(API_URL+`photos/${photo.id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(photo)
  }).then(r => r.json()).then(handleErrors)

const deletePhoto = id => 
  fetch(API_URL+`photos/${id}`, {
    method: "DELETE",
    headers: headers()
  }).then(r => r.json()).then(handleErrors)

const postAlbumsPhoto = (aid, pid) =>
  fetch(API_URL+"albums_photos", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({album_id: aid, photo_id: pid})
  }).then(r => r.json()).then(handleErrors)

const deleteAlbumsPhoto = (aid, pid) =>
  fetch(API_URL+`albums_photos/${aid},${pid}`, {
    method: "DELETE",
    headers: headers()
  }).then(r => r.json()).then(handleErrors)

const handleErrors = r => {
  if (r.error) throw r.error
  return r
}

export const api = {
  data: {
    getUser,
    postUser,
    postAlbum,
    patchAlbum,
    deleteAlbum,
    postPhoto,
    patchPhoto,
    deletePhoto,
    postAlbumsPhoto,
    deleteAlbumsPhoto
  }
};