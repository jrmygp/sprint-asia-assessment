package task

import (
	"fmt"
	"net/http"
	"server/model"
	request "server/request/task"
	"server/response"
	"server/service/task"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type controller struct {
	service task.Service
}

func NewController(service task.Service) *controller {
	return &controller{service}
}

func convertResponse(o model.Task) response.TaskResponse {

	return response.TaskResponse{
		ID:       o.ID,
		Title:    o.Title,
		Status:   o.Status,
		Deadline: o.Deadline,
	}
}

func (c *controller) FindAllTask(g *gin.Context) {
	tasks, err := c.service.FindAll()
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "ERROR",
			Data:   err,
		}
		g.JSON(http.StatusBadRequest, webResponse)
		return
	}

	var taskResponses []response.TaskResponse

	// Check if tasks is empty, if so, return an empty array
	if len(tasks) == 0 {
		webResponse := response.Response{
			Code:   http.StatusOK,
			Status: "OK",
			Data:   []response.TaskResponse{},
		}
		g.JSON(http.StatusOK, webResponse)
		return
	}

	for _, task := range tasks {
		response := convertResponse(task)

		taskResponses = append(taskResponses, response)
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   taskResponses,
	}

	g.JSON(http.StatusOK, webResponse)
}

func (c *controller) FindTaskByID(g *gin.Context) {
	idString := g.Param("task_id")
	id, _ := strconv.Atoi(idString)

	task, err := c.service.FindByID(id)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "ERROR",
			Data:   err,
		}
		g.JSON(http.StatusBadRequest, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   convertResponse(task),
	}

	g.JSON(http.StatusOK, webResponse)
}

func (c *controller) CreateNewTask(g *gin.Context) {
	var req request.CreateTaskRequest

	err := g.ShouldBindJSON(&req)
	if err != nil {
		errorMessages := []string{}
		for _, e := range err.(validator.ValidationErrors) {
			errorMessage := fmt.Sprintf("Field %s is %s", e.Field(), e.ActualTag())
			errorMessages = append(errorMessages, errorMessage)
		}

		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "ERROR",
			Data:   errorMessages,
		}
		g.JSON(http.StatusBadRequest, webResponse)
		return
	}

	task, err := c.service.CreateNew(req)
	if err != nil {
		g.JSON(http.StatusBadRequest, gin.H{
			"errors": err,
		})
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   convertResponse(task),
	}

	g.JSON(http.StatusOK, webResponse)
}

func (c *controller) UpdateTask(g *gin.Context) {
	var req request.UpdateTaskRequest

	err := g.ShouldBindJSON(&req)
	if err != nil {
		g.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	idString := g.Param("task_id")
	id, _ := strconv.Atoi(idString)

	task, err := c.service.Update(id, req)
	if err != nil {
		g.JSON(http.StatusBadRequest, gin.H{
			"errors": err,
		})
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   convertResponse(task),
	}

	g.JSON(http.StatusOK, webResponse)
}

func (c *controller) DeleteTask(g *gin.Context) {
	idString := g.Param("task_id")
	id, _ := strconv.Atoi(idString)

	task, err := c.service.Delete(id)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "ERROR",
			Data:   err,
		}
		g.JSON(http.StatusBadRequest, webResponse)
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   convertResponse(task),
	}

	g.JSON(http.StatusOK, webResponse)
}
