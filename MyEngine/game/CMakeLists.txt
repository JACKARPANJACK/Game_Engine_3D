add_executable(game src/main.cpp)
target_link_libraries(game PRIVATE engine glfw Vulkan::Vulkan)
