package checklist

import (
	"fmt"
	"net/http"
	"server/model"
	request "server/request/checklist"
	"server/response"
	"server/service/checklist"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type controller struct {
	service checklist.Service
}

func NewController(service checklist.Service) *controller {
	return &controller{service}
}

func convertChecklistResponse(o model.Checklist) response.ChecklistResponse {

	return response.ChecklistResponse{
		ID:     o.ID,
		TaskID: o.TaskID,
		Title:  o.Title,
		Status: o.Status,
	}
}

func (c *controller) FindAllByTask(g *gin.Context) {
	idString := g.Param("task_id")
	id, _ := strconv.Atoi(idString)

	checklists, err := c.service.FindAllByTask(id)
	if err != nil {
		webResponse := response.Response{
			Code:   http.StatusBadRequest,
			Status: "ERROR",
			Data:   err,
		}
		g.JSON(http.StatusBadRequest, webResponse)
		return
	}

	var checklistResponses []response.ChecklistResponse

	// Check if checklists is empty, if so, return an empty array
	if len(checklists) == 0 {
		webResponse := response.Response{
			Code:   http.StatusOK,
			Status: "OK",
			Data:   []response.ChecklistResponse{},
		}
		g.JSON(http.StatusOK, webResponse)
		return
	}

	for _, checklist := range checklists {
		response := convertChecklistResponse(checklist)

		checklistResponses = append(checklistResponses, response)
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   checklistResponses,
	}

	g.JSON(http.StatusOK, webResponse)
}

func (c *controller) CreateNewChecklist(g *gin.Context) {
	var req request.CreateChecklistRequest

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

	checklist, err := c.service.CreateNew(req)
	if err != nil {
		g.JSON(http.StatusBadRequest, gin.H{
			"errors": err,
		})
		return
	}

	webResponse := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   convertChecklistResponse(checklist),
	}

	g.JSON(http.StatusOK, webResponse)
}
