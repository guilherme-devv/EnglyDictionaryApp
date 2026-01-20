# Codebase Analysis: Engly Dictionary App

## Overview
This project is an English Dictionary application built with React Native (Expo). It follows a clean architecture using MVVM pattern, Zustand for state management, and ensures type safety with TypeScript.

## Architecture: MVVM (Model-View-ViewModel)
- **Models** (`src/models`): Define data structures (e.g., `Word`, `Meaning`, `Phonetic`).
- **ViewModels** (`src/viewmodels`): Handle business logic and state for screens. They use a simple observer pattern to notify views of changes.
  - Example: `HomeViewModel` manages the word list, pagination, and search.
- **Views**: React components in `app/` and `src/components/`. They subscribe to ViewModels or use Zustand stores.
- **Services** (`src/services`): Abstract external data sources.
  - `DictionaryAPI`: Fetches word data, handles caching via `CacheStorage`.
  - `AudioService`: Manages audio playback.

## State Management
- **Local State**: Managed within ViewModels (e.g., loading states, current page).
- **Global State**: Managed with **Zustand**.
  - `useFavoritesStore`: Persists favorite words using `AsyncStorage`.
  - `useHistoryStore`: Tracks search history.

## Navigation
- Uses **Expo Router** (`app/` directory).
- **Structure**:
  - `(tabs)`: Main tab navigation.
  - `detail/[word]`: Dynamic route for word details.

## Key Observations
- **Caching**: The app implements a caching strategy for API requests to improve performance and offline capability.
- **Error Handling**: Custom error parsing in API service to provide user-friendly messages.
- **Code Quality**: Clean code practices, well-separated concerns, and consistent styling.
- **Testing**: No automated tests (Unit or UI) were found in the current codebase. Adding tests would be a valuable improvement.

## Technology Stack
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **State**: Zustand
- **Networking**: Axios
- **Storage**: AsyncStorage
- **Icons**: Lucide React Native
