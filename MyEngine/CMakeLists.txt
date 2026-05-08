cmake_minimum_required(VERSION 3.20)

project(MyEngine)

set(CMAKE_CXX_STANDARD 20)

# Vulkan
find_package(Vulkan REQUIRED)

# Add thirdparty
add_subdirectory(thirdparty/glfw)

# Engine
add_subdirectory(engine)

# Game
add_subdirectory(game)