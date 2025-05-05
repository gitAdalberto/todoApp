module.exports = function (api) {
    api.cache(true);
    return{
        presets: ['babel-preset-expo'],
        plugins : [
            ['module-resolver',{alias:{
                '@config':'./config.js',
                
            },},],
            'react-native-reanimated/plugin'],
    }
}