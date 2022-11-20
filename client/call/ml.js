const APIV1 = "http://localhost:8000"
export const SUMMARYV1 = `${APIV1}/core/video/add/`
function postData(url = '', data = {}) {
   return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export function getSummary(videoId) {
	return postData(`${SUMMARYV1}`, {"video_id": videoId});
};

