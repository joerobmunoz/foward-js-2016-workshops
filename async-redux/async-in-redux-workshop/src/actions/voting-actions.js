// import fetch       from 'isomorphic-fetch';
// import {
//   API_KEY,
//   FETCH_CAT_DATA_PENDING,
//   FETCH_CAT_DATA_SUCCESS,
//   FETCH_CAT_DATA_FAILED,
//   CAT_VOTE_PENDING,
//   CAT_VOTE_SUCCESS,
//   CAT_VOTE_FAILED
// } from 'constants';

// export function fetchCatImage() {
//   return function(dispatch, getState) {

//     dispatch({ type: FETCH_CAT_DATA_PENDING });

//     const params = { api_key: API_KEY };

//     fetch('http://thecatapi.com/api/images/get', params)
//       .then((data) => {
//         dispatch({
//           type: FETCH_CAT_DATA_SUCCESS,
//           payload: data
//         });
//       })
//       .catch((error) => {
//         dispatch({
//           type: FETCH_CAT_DATA_FAILED,
//           error: true,
//           payload: error
//         })
//       });
//   }
// }

// export function upvote() {
//   return function(dispatch, getState) {
//     voteCatImage(dispatch, getState, 10);
//   }
// }

// export function downvote() {
//   return function(dispatch, getState) {
//     voteCatImage(dispatch, getState, 1);
//   }
// }

// function voteCatImage(dispatch, getState, score) {

//   dispatch({type: CAT_VOTE_PENDING});

//   const state = getState();
//   const url = state.catData.url;

//   const params = {
//     api_key  : API_KEY,
//     method   : 'POST',
//     mode     : 'no-cors',
//     image_id : url,
//     score
//   };

//   fetch('http://thecatapi.com/api/images/vote', params)
//     .then((data) => {
//       dispatch({
//         type: CAT_VOTE_SUCCESS,
//         payload: data
//       })
//       dispatch(fetchCatImage());
//     })
//     .catch((error) => {
//       dispatch({
//         type: CAT_VOTE_FAILED,
//         error: true,
//         payload: error
//       })
//     });
// };


import fetch           from 'isomorphic-fetch';
import { takeLatest }  from 'redux-saga'
import { put, select } from 'redux-saga/effects';
import {
  API_KEY,
  FETCH_CAT_DATA_PENDING,
  FETCH_CAT_DATA_SUCCESS,
  FETCH_CAT_DATA_FAILED,
  CAT_VOTE_SUCCESS,
  CAT_VOTE_FAILED,
  UPVOTE,
  DOWNVOTE
} from 'constants';

function* fetchCatImage(action) {

  const params = { api_key: API_KEY };

  try {
    const data = yield fetch('http://thecatapi.com/api/images/get', params);
    yield put({
      type: FETCH_CAT_DATA_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: FETCH_CAT_DATA_FAILED,
      error: true,
      payload: error
    })
  }
}

function* upvote(action) {
  yield* voteCatImage(10);
}

function* downvote(action) {
  yield* voteCatImage(1);
}

function* voteCatImage(score) {

  try {
    const url = yield select((state) => state.catData.url);

    const params = {
      api_key  : API_KEY,
      method   : 'POST',
      mode     : 'no-cors',
      image_id : url,
      score
    };

    const data = yield fetch('http://thecatapi.com/api/images/vote', params);

    yield put({
      type: CAT_VOTE_SUCCESS,
      payload: data
    });

    yield* fetchCatImage();

  } catch (error) {
    yield put({
      type: CAT_VOTE_FAILED,
      error: true,
      payload: error
    })
  }
};

export default function* rootSata() {
  yield [
    takeLatest(FETCH_CAT_DATA_PENDING, fetchCatImage),
    takeLatest(UPVOTE, upvote),
    takeLatest(DOWNVOTE, downvote)
  ];
}