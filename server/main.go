package main

import (
	"server/config"
	taskController "server/controller/task"
	taskRepository "server/repository/task"
	taskService "server/service/task"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db := config.DatabaseConnection()

	// Repository
	taskRepository := taskRepository.NewRepository(db)

	// Service
	taskService := taskService.NewService(taskRepository)

	// Controller
	taskController := taskController.NewController(taskService)

	// Router
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("", taskController.FindAllTask)

	router.Run(":8888")
}
