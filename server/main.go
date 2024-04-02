package main

import (
	"server/config"
	checklistController "server/controller/checklist"
	taskController "server/controller/task"
	checklistRepository "server/repository/checklist"
	taskRepository "server/repository/task"
	checklistService "server/service/checklist"
	taskService "server/service/task"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db := config.DatabaseConnection()

	// Repository
	taskRepository := taskRepository.NewRepository(db)
	checklistRepository := checklistRepository.NewRepository(db)

	// Service
	taskService := taskService.NewService(taskRepository)
	checklistService := checklistService.NewService(checklistRepository)

	// Controller
	taskController := taskController.NewController(taskService)
	checklistController := checklistController.NewController(checklistService)

	// Router
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/task", taskController.FindAllTask)
	router.POST("/task", taskController.CreateNewTask)
	router.GET("/:task_id/checklist", checklistController.FindAllByTask)
	router.POST("/checklist", checklistController.CreateNewChecklist)

	router.Run(":8888")
}
