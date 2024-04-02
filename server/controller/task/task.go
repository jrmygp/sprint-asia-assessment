package task

import (
	"net/http"
	"server/model"
	"server/response"
	"server/service/task"

	"github.com/gin-gonic/gin"
)

type controller struct {
	service task.Service
}

func NewController(service task.Service) *controller {
	return &controller{service}
}

func convertResponse(o model.Task) response.TaskResponse {
	var checklistResponses []response.ChecklistResponse

	for _, checklist := range o.Checklist {
		response := response.ChecklistResponse{
			Title:  checklist.Title,
			Status: checklist.Status,
		}
		checklistResponses = append(checklistResponses, response)
	}

	return response.TaskResponse{
		ID:        o.ID,
		Title:     o.Title,
		Status:    o.Status,
		Deadline:  o.Deadline,
		Checklist: checklistResponses,
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
