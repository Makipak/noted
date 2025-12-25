import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import RootNavigator from './RootNavigator';

export default function Navigation({ navigationRef, onReady }: { navigationRef: any; onReady?: () => void }) {
  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      <RootNavigator />
    </NavigationContainer>
  );
}
