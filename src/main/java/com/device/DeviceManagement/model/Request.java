package com.device.DeviceManagement.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Document(collection = "request")
public class Request implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private String id;
    private String requestType;
    private String timestamp;
    private String status;
    private List<Action> actions;

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Action> getActions() {
        return actions;
    }

    public void setActions(List<Action> actions) {
        this.actions = actions;
    }

    public static class Action {
        private String actionType;
        private String timestamp;
        private Details details;

        // Getters and setters
        public String getActionType() {
            return actionType;
        }

        public void setActionType(String actionType) {
            this.actionType = actionType;
        }

        public String getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(String timestamp) {
            this.timestamp = timestamp;
        }

        public Details getDetails() {
            return details;
        }

        public void setDetails(Details details) {
            this.details = details;
        }

        public static class Details {
            private String executedBy;
            private List<Note> notes;

            // Getters and setters
            public String getExecutedBy() {
                return executedBy;
            }

            public void setExecutedBy(String executedBy) {
                this.executedBy = executedBy;
            }

            public List<Note> getNotes() {
                return notes;
            }

            public void setNotes(List<Note> notes) {
                this.notes = notes;
            }

            public static class Note {
                private String noteId;
                private String timestamp;
                private String content;

                // Getters and setters
                public String getNoteId() {
                    return noteId;
                }

                public void setNoteId(String noteId) {
                    this.noteId = noteId;
                }

                public String getTimestamp() {
                    return timestamp;
                }

                public void setTimestamp(String timestamp) {
                    this.timestamp = timestamp;
                }

                public String getContent() {
                    return content;
                }

                public void setContent(String content) {
                    this.content = content;
                }
            }
        }
    }
}
