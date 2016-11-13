import entitie from './entitie';

export default function *rootSaga() {
  yield [
    entitie(),
  ];
}
