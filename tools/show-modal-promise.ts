type TShowModalParams = Parameters<typeof uni.showModal>;
type TShowModalPromise = (p: TShowModalParams['0']) => Promise<boolean>;
export const showModalPromise: TShowModalPromise = (params) => {
  return new Promise((resolve, reject) => {
    void uni.showModal({
      ...params,
      success: (res) => {
        if (res.confirm) {
          resolve(true);
        } else {
          reject();
        }
      },
      fail: (err) => {
        reject();
      },
    });
  });
};
