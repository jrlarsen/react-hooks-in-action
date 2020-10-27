import {shortISO} from "./date-wrangler";

export default function getData (url, delay = 0) {
  return fetch(url)
    .then(resp => {
      if (!resp.ok) {
        throw Error("There was a problem fetching data.");
      }

      return resp.json().then(json => {
        return new Promise(resolve => {
          setTimeout(() => resolve(json), delay);
        });
      });
    });
}

export function getBookings (bookableId, startDate, endDate) {

  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";

  const query = `bookableId=${bookableId}` +
    `&date_gte=${start}&date_lte=${end}`;

  return getData(`${urlRoot}?${query}`);
}

export function createItem (url, item) {
  return fetch(
    url,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(item)
    }
  ).then(r => {
    if (!r.ok) {
      throw new Error("There was a problem creating the item!");
    }
    return r.json();
  });
}

export function editItem (url, item) {
  return fetch(
    url,
    {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(item)
    }
  ).then(r => {
    if (!r.ok) {
      throw new Error("There was a problem updating the item!");
    }
    return r.json();
  });
}

export function deleteItem (url) {
  return fetch(
    url,
    {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    }
  ).then(r => {
    if (!r.ok) {
      throw new Error("There was a problem deleting the item!");
    }
    return r.json();
  });
}