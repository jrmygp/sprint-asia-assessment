package checklist

import (
	"net/http"
	"server/model"
	"server/response"
	"server/service/checklist"
	"strconv"

	"github.com/gin-gonic/gin"
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
