export function updateEntity(res) {
  if (res.data._id) {
    const { _id, ...data } = res.data;
    return {
      ...res,
      data: {
        ...data,
        id: res.data._id
      }
    }
  }

  if (res.data.items) {
    res.data.items = res.data.items?.map((el) => {
      const { _id, ...rest } = el;
      return {
        ...rest,
        id: _id
      }
    });
    return res;
  }
}