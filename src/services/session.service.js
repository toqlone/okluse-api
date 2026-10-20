export const saveSession = (req, userId) => {
  return new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err) return reject(err);

      req.session.userId = userId;

      req.session.save((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
};

export const revokeSession = (req) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) return reject(err);

      resolve();
    });
  });
};
