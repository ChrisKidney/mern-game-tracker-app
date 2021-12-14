module.exports = (req, res, next) => {
    req.body.steam_image = `https://cdn.akamai.steamstatic.com/steam/apps/${req.body.steam_app_id}/header.jpg`;
    next();
}