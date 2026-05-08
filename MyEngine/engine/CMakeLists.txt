add_library(engine STATIC
    src/Engine.cpp
)

target_include_directories(engine PUBLIC
    include
    ../thirdparty/glm
)

target_link_libraries(engine PUBLIC
    glfw
    Vulkan::Vulkan
)