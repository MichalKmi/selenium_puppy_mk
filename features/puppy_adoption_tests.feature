Feature: Puppy Adoption Site Tests

@test-1
Scenario: View details for the puppy Hanna, return to the puppy list
    Given I navigate to the puppy adoption site
    When I view details for the puppy named "Hanna"
    And I return to the puppy list
    Then I should be on the puppy list page

@test-2
Scenario: Verify that the puppy Maggie Mae is on the first page
    Given I navigate to the puppy adoption site
    Then I should see "Maggie Mae" on the 1 page

@test-3
Scenario: Verify that the puppy Tipsy is on the second page
    Given I navigate to the puppy adoption site
    When I go to the 2 page
    Then I should see "Tipsy" on the 2 page

@test-4
Scenario: View details for Twinkie, and verify that their adoption fee is $22.50
    Given I navigate to the puppy adoption site
    When I go to the 3 page
    And I view details for the puppy named "Twinkie"
    #originally it was dollars and Twinky, so ACs were not precise
    Then the adoption fee should be "£22.50"

@test-5
Scenario: View details for Spud, click the Adopt Me! button, and then click the change your mind button
    Given I navigate to the puppy adoption site
    When I go to the 2 page
    And I view details for the puppy named "Spud"
    And I click the "Adopt Me!" button
    #originally it was "Change Your Mind", on page small letters
    And I click the "Change your mind" button
    Then I should be on the puppy list page

@test-6
Scenario: View details for Hanna, click the Adopt Me! button, click the Adopt Another Puppy button, and adopt Maggie Mae.
    Given I navigate to the puppy adoption site
    When I view details for the puppy named "Hanna"
    And I click the "Adopt Me!" button
    And I click the "Adopt Another Puppy" button
    And I view details for the puppy named "Maggie Mae"
    And I click the "Adopt Me!" button
    And On the list to adoption there is "Maggie Mae"
    And On the list to adoption there is "Hanna"
    And I click the "Complete the Adoption" button
    And I complete the adoption process with a credit card
    And I click the "Place Order" button
    Then I should see a confirmation message for the adoption
    # Scenario: Complete the adoption with credit card, and verify the adoption has been completed included above

# Scenario not implemented on heroku app, checked both in mocks and API
#Scenario: Adopt Brook and add a travel carrier, and verify that the total amount has increased by the price of the carrier
#    Given I navigate to the puppy adoption site
#    When I view details for the puppy named "Brook"
#    And I click the "Adopt Me!" button
#    And I add a "travel carrier" for "Brook"
#    And I click the "Complete the Adoption" button
#    Then total amount has increased by the price of the carrier


@test-7 
Scenario: Adopt Brook and Maggie Mae. Add a first vet visit and a collar and leash for Brook, and add a travel carrier for Maggie Mae. Complete the adoption with a credit card, and verify the adoption has been completed
    Given I navigate to the puppy adoption site
    When I view details for the puppy named "Brook"
    And I click the "Adopt Me!" button
    And I click the "Adopt Another Puppy" button
    And I view details for the puppy named "Maggie Mae"
    And I click the "Adopt Me!" button
    And On the list to adoption there is "Maggie Mae"
    And On the list to adoption there is "Brook"
    And I add a "Collar & Leash" for "Brook"
    And I add a "Travel Carrier" for "Maggie Mae"
    And I click the "Complete the Adoption" button
    And I complete the adoption process with a credit card
    And I click the "Place Order" button
    Then I should see a confirmation message for the adoption
    # Real verification not possible - app base on mocks
