package response

type Checklistresponse struct {
	Title  string `json:"title"`
	Status string `json:"status"`
}

type TaskResponse struct {
	ID        int                 `json:"id"`
	Title     string              `json:"title"`
	Status    string              `json:"status"`
	Checklist []Checklistresponse `json:"checklist"`
}
