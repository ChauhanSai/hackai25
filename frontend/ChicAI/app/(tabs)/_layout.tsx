import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';

import { IconSymbol } from '@/components/ui/IconSymbol';
import Svg, { Path, SvgProps } from "react-native-svg";

import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const activeTintColor = "#4361EE";

// Tab Icons at https://icon-sets.iconify.design/solar/
export function SolarHomeSmileAngleBold(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M13.106 22h-2.212c-3.447 0-5.17 0-6.345-1.012s-1.419-2.705-1.906-6.093l-.279-1.937c-.38-2.637-.57-3.956-.029-5.083s1.691-1.813 3.992-3.183l1.385-.825C9.8 2.622 10.846 2 12 2s2.199.622 4.288 1.867l1.385.825c2.3 1.37 3.451 2.056 3.992 3.183s.35 2.446-.03 5.083l-.278 1.937c-.487 3.388-.731 5.081-1.906 6.093S16.553 22 13.106 22m-4.708-6.447a.75.75 0 0 1 1.049-.156c.728.54 1.607.853 2.553.853s1.825-.313 2.553-.853a.75.75 0 1 1 .894 1.205A5.77 5.77 0 0 1 12 17.75a5.77 5.77 0 0 1-3.447-1.148a.75.75 0 0 1-.155-1.049"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export function SolarHomeSmileAngleOutline(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        d="M9.447 15.397a.75.75 0 1 0-.894 1.205A5.77 5.77 0 0 0 12 17.75a5.77 5.77 0 0 0 3.447-1.148a.75.75 0 1 0-.893-1.205A4.27 4.27 0 0 1 12 16.25a4.27 4.27 0 0 1-2.553-.853"
      ></Path>
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M12 1.25c-.725 0-1.387.2-2.11.537c-.702.327-1.512.81-2.528 1.415l-1.456.867c-1.119.667-2.01 1.198-2.686 1.706C2.523 6.3 2 6.84 1.66 7.551c-.342.711-.434 1.456-.405 2.325c.029.841.176 1.864.36 3.146l.293 2.032c.237 1.65.426 2.959.707 3.978c.29 1.05.702 1.885 1.445 2.524c.742.64 1.63.925 2.716 1.062c1.056.132 2.387.132 4.066.132h2.316c1.68 0 3.01 0 4.066-.132c1.086-.137 1.974-.422 2.716-1.061c.743-.64 1.155-1.474 1.445-2.525c.281-1.02.47-2.328.707-3.978l.292-2.032c.185-1.282.332-2.305.36-3.146c.03-.87-.062-1.614-.403-2.325S21.477 6.3 20.78 5.775c-.675-.508-1.567-1.039-2.686-1.706l-1.456-.867c-1.016-.605-1.826-1.088-2.527-1.415c-.724-.338-1.386-.537-2.111-.537M8.096 4.511c1.057-.63 1.803-1.073 2.428-1.365c.609-.284 1.047-.396 1.476-.396s.867.112 1.476.396c.625.292 1.37.735 2.428 1.365l1.385.825c1.165.694 1.986 1.184 2.59 1.638c.587.443.91.809 1.11 1.225c.199.416.282.894.257 1.626c-.026.75-.16 1.691-.352 3.026l-.28 1.937c-.246 1.714-.422 2.928-.675 3.845c-.247.896-.545 1.415-.977 1.787c-.433.373-.994.593-1.925.71c-.951.119-2.188.12-3.93.12h-2.213c-1.743 0-2.98-.001-3.931-.12c-.93-.117-1.492-.337-1.925-.71c-.432-.372-.73-.891-.977-1.787c-.253-.917-.43-2.131-.676-3.845l-.279-1.937c-.192-1.335-.326-2.277-.352-3.026c-.025-.732.058-1.21.258-1.626s.521-.782 1.11-1.225c.603-.454 1.424-.944 2.589-1.638z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export function SolarAccessibilityBold(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-13a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-5.707.31a.75.75 0 0 0-.586 1.38l.002.001l.002.001l.01.004l.032.014a15 15 0 0 0 .572.225c.38.145.914.338 1.527.53c.988.312 2.236.64 3.398.748v1.24c0 .43-.124.853-.357 1.216l-2.524 3.925a.75.75 0 0 0 1.262.812l2.37-3.686l2.368 3.686a.75.75 0 0 0 1.262-.812l-2.524-3.925a2.25 2.25 0 0 1-.357-1.217v-1.239c1.162-.108 2.41-.436 3.399-.748a28 28 0 0 0 2.098-.755l.033-.014l.01-.004l.002-.001a.75.75 0 0 0-.585-1.381l-.007.003l-.027.011l-.11.045q-.148.061-.42.164c-.36.137-.865.32-1.444.502c-1.178.37-2.588.715-3.699.715s-2.52-.345-3.698-.715a27 27 0 0 1-1.974-.711L6.3 9.313z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export function SolarAccessibilityOutline(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M9.25 7a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0M12 5.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5"
        clipRule="evenodd"
      ></Path>
      <Path
        fill={props.color || "currentColor"}
        d="M5.31 9.707a.75.75 0 0 1 .983-.398l.001.001l.006.003l.027.011l.11.045q.149.061.42.164c.36.137.865.32 1.445.502c1.178.37 2.587.715 3.698.715s2.52-.345 3.698-.715a27 27 0 0 0 1.974-.711l.028-.011l.006-.003h.001a.75.75 0 0 1 .586 1.38l-.004.002l-.01.004l-.032.014l-.123.05a28 28 0 0 1-1.976.706c-.988.31-2.236.639-3.398.747v1.24c0 .43.124.853.357 1.216l2.524 3.925a.75.75 0 0 1-1.262.812L12 15.72l-2.37 3.686a.75.75 0 1 1-1.26-.812l2.523-3.925a2.25 2.25 0 0 0 .357-1.217v-1.239c-1.162-.108-2.41-.436-3.399-.747a28 28 0 0 1-2.098-.756l-.033-.014l-.009-.004l-.004-.001a.75.75 0 0 1-.397-.984"
      ></Path>
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12M12 2.75a9.25 9.25 0 1 0 0 18.5a9.25 9.25 0 0 0 0-18.5"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export function SolarChatSquareLikeBold(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="m13.087 21.388l.542-.916c.42-.71.63-1.066.968-1.262c.338-.197.763-.204 1.613-.219c1.256-.021 2.043-.098 2.703-.372a5 5 0 0 0 2.706-2.706C22 14.995 22 13.83 22 11.5v-1c0-3.273 0-4.91-.737-6.112a5 5 0 0 0-1.65-1.651C18.41 2 16.773 2 13.5 2h-3c-3.273 0-4.91 0-6.112.737a5 5 0 0 0-1.651 1.65C2 5.59 2 7.228 2 10.5v1c0 2.33 0 3.495.38 4.413a5 5 0 0 0 2.707 2.706c.66.274 1.447.35 2.703.372c.85.015 1.275.022 1.613.219c.337.196.548.551.968 1.262l.542.916c.483.816 1.69.816 2.174 0M7.5 9.715c0 1.752 2.163 3.615 3.49 4.593c.454.335.681.502 1.01.502s.556-.167 1.01-.502c1.327-.978 3.49-2.84 3.49-4.593c0-2.677-2.475-3.677-4.5-1.609c-2.025-2.068-4.5-1.068-4.5 1.609"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
export function SolarChatSquareLikeOutline(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M10.46 1.25h3.08c1.603 0 2.86 0 3.864.095c1.023.098 1.861.3 2.6.752a5.75 5.75 0 0 1 1.899 1.899c.452.738.654 1.577.752 2.6c.095 1.004.095 2.261.095 3.865v1.067c0 1.141 0 2.036-.05 2.759c-.05.735-.153 1.347-.388 1.913a5.75 5.75 0 0 1-3.112 3.112c-.805.334-1.721.408-2.977.43a11 11 0 0 0-.929.036c-.198.022-.275.054-.32.08c-.047.028-.112.078-.224.232c-.121.166-.258.396-.476.764l-.542.916c-.773 1.307-2.69 1.307-3.464 0l-.542-.916a11 11 0 0 0-.476-.764c-.112-.154-.177-.204-.224-.232c-.045-.026-.122-.058-.32-.08c-.212-.023-.49-.03-.93-.037c-1.255-.021-2.171-.095-2.976-.429A5.75 5.75 0 0 1 1.688 16.2c-.235-.566-.338-1.178-.389-1.913c-.049-.723-.049-1.618-.049-2.76v-1.066c0-1.604 0-2.86.095-3.865c.098-1.023.3-1.862.752-2.6a5.75 5.75 0 0 1 1.899-1.899c.738-.452 1.577-.654 2.6-.752C7.6 1.25 8.857 1.25 10.461 1.25M6.739 2.839c-.914.087-1.495.253-1.959.537A4.25 4.25 0 0 0 3.376 4.78c-.284.464-.45 1.045-.537 1.96c-.088.924-.089 2.11-.089 3.761v1c0 1.175 0 2.019.046 2.685c.045.659.131 1.089.278 1.441a4.25 4.25 0 0 0 2.3 2.3c.515.214 1.173.294 2.429.316h.031c.398.007.747.013 1.037.045c.311.035.616.104.909.274c.29.17.5.395.682.645c.169.232.342.525.538.856l.559.944a.52.52 0 0 0 .882 0l.559-.944c.196-.331.37-.624.538-.856c.182-.25.392-.476.682-.645c.293-.17.598-.24.909-.274c.29-.032.639-.038 1.037-.045h.032c1.255-.022 1.913-.102 2.428-.316a4.25 4.25 0 0 0 2.3-2.3c.147-.352.233-.782.278-1.441c.046-.666.046-1.51.046-2.685v-1c0-1.651 0-2.837-.089-3.762c-.087-.914-.253-1.495-.537-1.959a4.25 4.25 0 0 0-1.403-1.403c-.464-.284-1.045-.45-1.96-.537c-.924-.088-2.11-.089-3.761-.089h-3c-1.651 0-2.837 0-3.762.089m8.534 3.59c1.235.461 1.978 1.716 1.978 3.286c0 1.16-.699 2.242-1.433 3.081c-.758.865-1.679 1.613-2.362 2.116l-.08.06c-.372.276-.793.588-1.375.588s-1.003-.312-1.374-.588l-.08-.06c-.684-.504-1.605-1.25-2.363-2.116c-.734-.839-1.433-1.92-1.433-3.081c0-1.57.743-2.825 1.978-3.287c1.043-.39 2.23-.136 3.272.674c1.043-.81 2.23-1.063 3.272-.674m-.525 1.404c-.518-.193-1.342-.09-2.211.798a.75.75 0 0 1-1.072 0c-.869-.888-1.693-.99-2.21-.798c-.51.19-1.004.774-1.004 1.882c0 .591.383 1.318 1.062 2.093c.655.749 1.48 1.422 2.123 1.896c.243.18.366.268.464.321c.066.036.084.035.099.035h.004c.015 0 .034 0 .099-.035a5 5 0 0 0 .464-.32c.644-.475 1.468-1.148 2.123-1.897c.68-.775 1.062-1.502 1.062-2.093c0-1.108-.495-1.691-1.003-1.882"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <SolarHomeSmileAngleBold
                width={size}
                height={size}
                color={color}
              />
            ) : (
              <SolarHomeSmileAngleOutline
                width={size}
                height={size}
                color={color}
              />
            ),
          tabBarActiveTintColor: activeTintColor,
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: "ChicAI",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <SolarAccessibilityBold
                width={size}
                height={size}
                color={color}
              />
            ) : (
              <SolarAccessibilityOutline
                width={size}
                height={size}
                color={color}
              />
            ),
          tabBarActiveTintColor: activeTintColor,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <SolarChatSquareLikeBold
                width={size}
                height={size}
                color={color}
              />
            ) : (
              <SolarChatSquareLikeOutline
                width={size}
                height={size}
                color={color}
              />
            ),
          tabBarActiveTintColor: activeTintColor,
        }}
      />
    </Tabs>
  );
}
