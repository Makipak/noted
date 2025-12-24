import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import RootNavigator from './RootNavigator';

export default function Navigation({ navigationRef }: { navigationRef: any }) {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}
