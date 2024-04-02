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

	taskRouter := router.Group("/task")

	taskRouter.GET("", taskController.FindAllTask)
	taskRouter.GET("/:task_id", taskController.FindTaskByID)
	taskRouter.POST("", taskController.CreateNewTask)
	taskRouter.PATCH("/:task_id", taskController.UpdateTask)
	taskRouter.DELETE("/:task_id", taskController.DeleteTask)
	router.GET("/:task_id/checklist", checklistController.FindAllByTask)
	router.POST("/checklist", checklistController.CreateNewChecklist)

	router.Run(":8888")
}
