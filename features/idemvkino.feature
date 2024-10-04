Feature: Let's go to the cinema tests

    Scenario: Booking for last the Witcher should be successful
        Given user is on main page
        When user chooses the day and the time of the session
        Then goes to the movie page and sees the title "Ведьмак"

    Scenario: Booking several tickets
        Given user is on main page
        When user click the day and the time of the session
        When user book the several tickets
        Then sees the title "Вы выбрали билеты:"

    Scenario: Book button is inactive
        Given user is on main page
        When user click the day and the time
        When user book a seat that is occupied
        Then the book button should not be active

