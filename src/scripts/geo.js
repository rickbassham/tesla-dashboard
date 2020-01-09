function pos_to_object(pos) {
  return {
    coords: {
      accuracy: pos.coords.accuracy,
      altitude: pos.coords.altitude,
      altitudeAccuracy: pos.coords.altitudeAccuracy,
      heading: pos.coords.heading,
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      speed: pos.coords.speed,
    },
    timestamp: pos.timestamp,
  };
}

function err_to_object(e) {
  return {
    code: e.code,
    message: e.message,
  };
}

export async function getLocation(opts) {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(pos => {
        resolve(pos_to_object(pos));
      }, e => {
        reject(err_to_object(e));
      }, opts);
    } else {
      reject("unsupported browser");
    }
  });
}

export function watchLocation(opts, success, error) {
  if (navigator.geolocation && navigator.geolocation.watchPosition) {
    navigator.geolocation.watchPosition(pos => {
      success(pos_to_object(pos));
    }, e => {
      let event = new CustomEvent("location_error", err_to_object(e));
      window.dispatchEvent(event);
    }, opts);
  } else {
    error(err_to_object({message: "unsupported browser"}));
  }
}
