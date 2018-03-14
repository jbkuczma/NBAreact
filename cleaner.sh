# bundling issues usally arise with React Native
#
# This script is for running the suggestions for fixing React Native Issue #4968

rm -rf node_modules/

npm cache clean --force

rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/haste-map-react-native-packager-*

npm install

npm cache clean --force
