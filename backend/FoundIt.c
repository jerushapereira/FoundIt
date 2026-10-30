#include <stdio.h>
#include <stdlib.h>

struct Item {
    int id;
    char name[50];
    char location[50];
    char type[10];
    int returned;
    struct Item *next;
};

struct Item *head = NULL;
struct Item *tail = NULL;
int nextId = 101;

// Add an item in O(1) time
void addItem() {
    struct Item *newItem = malloc(sizeof(struct Item));

    if (newItem == NULL) {
        printf("Memory allocation failed.\n");
        return;
    }

    newItem->id = nextId++;

    printf("Enter item name: ");
    scanf(" %49[^\n]", newItem->name);

    printf("Enter location: ");
    scanf(" %49[^\n]", newItem->location);

    printf("Enter type (Lost/Found): ");
    scanf("%9s", newItem->type);

    newItem->returned = 0;
    newItem->next = NULL;

    if (head == NULL) {
        head = newItem;
        tail = newItem;
    } else {
        tail->next = newItem;
        tail = newItem;
    }

    printf("Item added successfully! ID: %d\n", newItem->id);
}

// Display all items in O(n) time
void displayItems() {
    struct Item *temp = head;

    if (head == NULL) {
        printf("No items found.\n");
        return;
    }

    while (temp != NULL) {
        printf("\nID: %d", temp->id);
        printf("\nName: %s", temp->name);
        printf("\nLocation: %s", temp->location);
        printf("\nType: %s", temp->type);
        printf("\nStatus: %s\n",
               temp->returned ? "Returned" : "Not Returned");

        temp = temp->next;
    }
}

// Search for an item by ID in O(n) time
void searchItem() {
    int id;
    struct Item *temp = head;

    printf("Enter item ID: ");

    if (scanf("%d", &id) != 1) {
        printf("Invalid ID.\n");
        while (getchar() != '\n');
        return;
    }

    while (temp != NULL) {
        if (temp->id == id) {
            printf("\nItem found!");
            printf("\nName: %s", temp->name);
            printf("\nLocation: %s", temp->location);
            printf("\nType: %s", temp->type);
            printf("\nStatus: %s\n",
                   temp->returned ? "Returned" : "Not Returned");
            return;
        }

        temp = temp->next;
    }

    printf("Item not found.\n");
}

// Mark an item as returned in O(n) time
void markReturned() {
    int id;
    struct Item *temp = head;

    printf("Enter item ID: ");

    if (scanf("%d", &id) != 1) {
        printf("Invalid ID.\n");
        while (getchar() != '\n');
        return;
    }

    while (temp != NULL) {
        if (temp->id == id) {
            temp->returned = 1;
            printf("Item marked as returned.\n");
            return;
        }

        temp = temp->next;
    }

    printf("Item not found.\n");
}

// Delete an item by ID in O(n) time
void deleteItem() {
    int id;
    struct Item *temp = head;
    struct Item *prev = NULL;

    printf("Enter item ID: ");

    if (scanf("%d", &id) != 1) {
        printf("Invalid ID.\n");
        while (getchar() != '\n');
        return;
    }

    while (temp != NULL && temp->id != id) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL) {
        printf("Item not found.\n");
        return;
    }

    if (prev == NULL) {
        head = temp->next;
    } else {
        prev->next = temp->next;
    }

    // Update tail if the last node is deleted
    if (temp == tail) {
        tail = prev;
    }

    free(temp);
    printf("Item deleted successfully.\n");
}

int main() {
    int choice;

    do {
        printf("\n===== FoundIt =====\n");
        printf("1. Add Item\n");
        printf("2. Display Items\n");
        printf("3. Search Item\n");
        printf("4. Mark Item Returned\n");
        printf("5. Delete Item\n");
        printf("6. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid choice.\n");
            while (getchar() != '\n');
            continue;
        }

        switch (choice) {
            case 1:
                addItem();
                break;
            case 2:
                displayItems();
                break;
            case 3:
                searchItem();
                break;
            case 4:
                markReturned();
                break;
            case 5:
                deleteItem();
                break;
            case 6:
                printf("Exiting FoundIt.\n");
                break;
            default:
                printf("Invalid choice. Try again.\n");
        }

    } while (choice != 6);

    // Free all remaining nodes
    while (head != NULL) {
        struct Item *temp = head;
        head = head->next;
        free(temp);
    }

    tail = NULL;
    return 0;
}
